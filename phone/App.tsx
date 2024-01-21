import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';

import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import * as posedetection from '@tensorflow-models/pose-detection';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  bundleResourceIO,
  cameraWithTensors,
} from '@tensorflow/tfjs-react-native';
import { Svg, Circle, Line } from 'react-native-svg';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { CameraType } from 'expo-camera/build/Camera.types';

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

// Camera preview size.
//
// From experiments, to render camera feed without distortion, 16:9 ratio
// should be used fo iOS devices and 4:3 ratio should be used for android
// devices.
//
// This might not cover all cases.
const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

// The score threshold for pose detection results.
const MIN_KEYPOINT_SCORE = 0.3;

// The size of the resized output from TensorCamera.
//
// For movenet, the size here doesn't matter too much because the model will
// preprocess the input (crop, resize, etc). For best result, use the size that
// doesn't distort the image.
const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

// Whether to auto-render TensorCamera preview.
const AUTO_RENDER = false;

// Whether to load model from app bundle (true) or through network (false).
const LOAD_MODEL_FROM_BUNDLE = false;

export default function App() {
  const cameraRef = useRef(null);
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState<posedetection.PoseDetector>();
  const [poses, setPoses] = useState<posedetection.Pose[]>();
  const [fps, setFps] = useState(0);
  const [orientation, setOrientation] =
    useState<ScreenOrientation.Orientation>();
  const [cameraType, setCameraType] = useState<CameraType>(
    Camera.Constants.Type.front
  );
  // Use `useRef` so that changing it won't trigger a re-render.
  //
  // - null: unset (initial value).
  // - 0: animation frame/loop has been canceled.
  // - >0: animation frame has been scheduled.
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      // Set initial orientation.
      const curOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(curOrientation);

      // Listens to orientation change.
      ScreenOrientation.addOrientationChangeListener((event) => {
        setOrientation(event.orientationInfo.orientation);
      });

      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      await tf.ready();

      // Load movenet model.
      // https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
      const movenetModelConfig: posedetection.MoveNetModelConfig = {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      };
      if (LOAD_MODEL_FROM_BUNDLE) {
        const modelJson = require('./offline_model/model.json');
        const modelWeights1 = require('./offline_model/group1-shard1of2.bin');
        const modelWeights2 = require('./offline_model/group1-shard2of2.bin');
        movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [
          modelWeights1,
          modelWeights2,
        ]);
      }
      const model = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        movenetModelConfig
      );
      setModel(model);

      // Ready!
      setTfReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    // Called when the app is unmounted.
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const handleCameraStream = async (
    images: IterableIterator<tf.Tensor3D>,
    updatePreview: () => void,
    gl: ExpoWebGLRenderingContext
  ) => {
    const loop = async () => {
      // Get the tensor and run pose detection.
      const imageTensor = images.next().value as tf.Tensor3D;

      const startTs = Date.now();
      const poses = await model!.estimatePoses(
        imageTensor,
        undefined,
        Date.now()
      );
      const latency = Date.now() - startTs;
      setFps(Math.floor(1000 / latency));
      setPoses(poses);
      tf.dispose([imageTensor]);

      if (rafId.current === 0) {
        return;
      }

      // Render camera preview manually when autorender=false.
      if (!AUTO_RENDER) {
        updatePreview();
        gl.endFrameEXP();
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const renderPose = () => {
    if (poses != null && poses.length > 0) {
      const keypointts = poses[0].keypoints
        .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
        .map((k) => {
          // Flip horizontally on android or when using back camera on iOS.
          const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back;
          const x = flipX ? getOutputTensorWidth() - k.x : k.x;
          const y = k.y;
          const cx =
            (x / getOutputTensorWidth()) *
            (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
          const cy =
            (y / getOutputTensorHeight()) *
            (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH);
            const excludedKeypoints = ['left_eye', 'right_eye', 'left_ear', 'right_ear', 'nose'];
          if (excludedKeypoints.includes(k.name ?? '')) {
              return null;
            }
          return (
            <Circle
              key={`skeletonkp_${k.name}`}
              cx={cx}
              cy={cy}
              r='4'
              strokeWidth='2'
              fill='#00AA00'
              stroke='white'
            />
          );
        });

      // Draw line segments
      const keypoints = poses[0].keypoints;
      const lineSegments = [];
      const rightShoulder = keypoints.find((k) => k.name === 'right_shoulder');
      const rightElbow = keypoints.find((k) => k.name === 'right_elbow');
      const rightWrist = keypoints.find((k) => k.name === 'right_wrist');
      const rightHip = keypoints.find((k) => k.name === 'right_hip');
      const rightKnee = keypoints.find((k) => k.name === 'right_knee');
      const rightAnkle = keypoints.find((k) => k.name === 'right_ankle');

      const leftShoulder = keypoints.find((k) => k.name === 'left_shoulder');
      const leftElbow = keypoints.find((k) => k.name === 'left_elbow');
      const leftWrist = keypoints.find((k) => k.name === 'left_wrist');
      const leftHip = keypoints.find((k) => k.name === 'left_hip');
      const leftKnee = keypoints.find((k) => k.name === 'left_knee');
      const leftAnkle = keypoints.find((k) => k.name === 'left_ankle');

      if (rightShoulder && rightElbow) {
        lineSegments.push(
          <Line
            key="rshoulderToElbow"
            x1={rightShoulder.x}
            y1={rightShoulder.y}
            x2={rightElbow.x}
            y2={rightElbow.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (rightElbow && rightWrist) {
        lineSegments.push(
          <Line
            key="relbowToWrist"
            x1={rightElbow.x}
            y1={rightElbow.y}
            x2={rightWrist.x}
            y2={rightWrist.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (rightHip && rightKnee) {
        lineSegments.push(
          <Line
            key="rhipToKnee"
            x1={rightHip.x}
            y1={rightHip.y}
            x2={rightKnee.x}
            y2={rightKnee.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (rightKnee && rightAnkle) {
        lineSegments.push(
          <Line
            key="rkneeToAnkle"
            x1={rightKnee.x}
            y1={rightKnee.y}
            x2={rightAnkle.x}
            y2={rightAnkle.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (leftShoulder && leftElbow) {
        lineSegments.push(
          <Line
            key="shoulderToElbow"
            x1={leftShoulder.x}
            y1={leftShoulder.y}
            x2={leftElbow.x}
            y2={leftElbow.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (leftElbow && leftWrist) {
        lineSegments.push(
          <Line
            key="elbowToWrist"
            x1={leftElbow.x}
            y1={leftElbow.y}
            x2={leftWrist.x}
            y2={leftWrist.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (leftHip && leftKnee) {
        lineSegments.push(
          <Line
            key="hipToKnee"
            x1={leftHip.x}
            y1={leftHip.y}
            x2={leftKnee.x}
            y2={leftKnee.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }

      if (leftKnee && leftAnkle) {
        lineSegments.push(
          <Line
            key="kneeToAnkle"
            x1={leftKnee.x}
            y1={leftKnee.y}
            x2={leftAnkle.x}
            y2={leftAnkle.y}
            stroke="yellow"
            strokeWidth="5"
          />
        );
      }
      const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back;
      const transformedLineSegments = lineSegments.map((segment) => {
        const outputTensorWidth = getOutputTensorWidth();
        const outputTensorHeight = getOutputTensorHeight();
        const previewWidth = isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT;
        const previewHeight = isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH;

        const transformedX1 = flipX
          ? outputTensorWidth - (segment.props.x1 / outputTensorWidth) * previewWidth
          : (segment.props.x1 / outputTensorWidth) * previewWidth;
        const ttransformedX1 = transformedX1 + CAM_PREVIEW_WIDTH / 2;

        const transformedX2 = flipX
          ? outputTensorWidth - (segment.props.x2 / outputTensorWidth) * previewWidth
          : (segment.props.x2 / outputTensorWidth) * previewWidth;

        const ttransformedX2 = transformedX2 + CAM_PREVIEW_WIDTH / 2;

        const transformedY1 = (segment.props.y1 / outputTensorHeight) * previewHeight;
        const transformedY2 = (segment.props.y2 / outputTensorHeight) * previewHeight;

        const transformedSegment = React.cloneElement(segment, {
          x1: ttransformedX1 + 25,
          x2: ttransformedX2 + 25,
          y1: transformedY1,
          y2: transformedY2,
        });
        return transformedSegment;
      });

      return (
        <Svg style={styles.svg}>
          {transformedLineSegments}
          {keypointts}
        </Svg>
      );
    } else {
      return <View></View>;
    }
  };

  const computeArmAngle = () => {
    if (poses != null && poses.length > 0) {
      const keypoints = poses[0].keypoints;
      const rightShoulder = keypoints.find((k) => k.name === 'right_shoulder');
      const rightElbow = keypoints.find((k) => k.name === 'right_elbow');
      const rightWrist = keypoints.find((k) => k.name === 'right_wrist');

      if (rightShoulder && rightElbow && rightWrist) {
        const shoulderToElbow = Math.atan2(
          rightElbow.y - rightShoulder.y,
          rightElbow.x - rightShoulder.x
        );
        const elbowToWrist = Math.atan2(
          rightWrist.y - rightElbow.y,
          rightWrist.x - rightElbow.x
        );
        let armAngle = (elbowToWrist - shoulderToElbow) * (180 / Math.PI);
        
        // Convert negative angles to positive
        if (armAngle < 0) {
          armAngle += 360;
        }
        armAngle = 180 - armAngle;
        // make arm angle positive with absolute value
        armAngle = Math.abs(armAngle);

        return <Text>Right Arm Angle: {armAngle.toFixed(2)} degrees</Text>;
      }
    }

    return null;
  };

  const computeLegAngle = () => {
    if (poses != null && poses.length > 0) {
      const keypoints = poses[0].keypoints;
      const rightHip = keypoints.find((k) => k.name === 'right_hip');
      const rightKnee = keypoints.find((k) => k.name === 'right_knee');
      const rightAnkle = keypoints.find((k) => k.name === 'right_ankle');

      if (rightHip && rightKnee && rightAnkle) {
        const hipToKnee = Math.atan2(
          rightKnee.y - rightHip.y,
          rightKnee.x - rightHip.x
        );
        const kneeToAnkle = Math.atan2(
          rightAnkle.y - rightKnee.y,
          rightAnkle.x - rightKnee.x
        );
        let legAngle = (kneeToAnkle - hipToKnee) * (180 / Math.PI);
              
              // Convert negative angles to positive
              if (legAngle < 0) {
                legAngle += 360;
              }

              legAngle = 180 - legAngle;
              // make arm angle positive with absolute value
              legAngle = Math.abs(legAngle);

              return <Text>Right Leg Angle: {legAngle.toFixed(2)} degrees</Text>;
            }
    }

    return null;
  };

  const renderFps = () => {
    return (
      <View style={styles.fpsContainer}>
        {/* <Text>FPS: {fps}</Text> */}
        {computeArmAngle()}
        {computeLegAngle()}
      </View>
    );
  };

  const renderCameraTypeSwitcher = () => {
    return (
      <View
        style={styles.cameraTypeSwitcher}
        onTouchEnd={handleSwitchCameraType}
      >
        <Text>
          Switch to{' '}
          {cameraType === Camera.Constants.Type.front ? 'back' : 'front'} camera
        </Text>
      </View>
    );
  };

  const handleSwitchCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const isPortrait = () => {
    return (
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    );
  };

  const getOutputTensorWidth = () => {
    // On iOS landscape mode, switch width and height of the output tensor to
    // get better result. Without this, the image stored in the output tensor
    // would be stretched too much.
    //
    // Same for getOutputTensorHeight below.
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_WIDTH
      : OUTPUT_TENSOR_HEIGHT;
  };

  const getOutputTensorHeight = () => {
    return isPortrait() || IS_ANDROID
      ? OUTPUT_TENSOR_HEIGHT
      : OUTPUT_TENSOR_WIDTH;
  };

  const getTextureRotationAngleInDegrees = () => {
    // On Android, the camera texture will rotate behind the scene as the phone
    // changes orientation, so we don't need to rotate it in TensorCamera.
    if (IS_ANDROID) {
      return 0;
    }

    // For iOS, the camera texture won't rotate automatically. Calculate the
    // rotation angles here which will be passed to TensorCamera to rotate it
    // internally.
    switch (orientation) {
      // Not supported on iOS as of 11/2021, but add it here just in case.
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 180;
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return cameraType === Camera.Constants.Type.front ? 270 : 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return cameraType === Camera.Constants.Type.front ? 90 : 270;
      default:
        return 0;
    }
  };

  if (!tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      // Note that you don't need to specify `cameraTextureWidth` and
      // `cameraTextureHeight` prop in `TensorCamera` below.
      <View
        style={
          isPortrait() ? styles.containerPortrait : styles.containerLandscape
        }
      >
        <TensorCamera
          ref={cameraRef}
          style={styles.camera}
          autorender={AUTO_RENDER}
          type={cameraType}
          // tensor related props
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees()}
          onReady={handleCameraStream}
        />
        {renderPose()}
        {renderFps()}
        {renderCameraTypeSwitcher()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPortrait: {
    position: 'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    marginTop: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  containerLandscape: {
    position: 'relative',
    width: CAM_PREVIEW_HEIGHT,
    height: CAM_PREVIEW_WIDTH,
    marginLeft: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  loadingMsg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 30,
  },
  fpsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 160,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
  cameraTypeSwitcher: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .7)',
    borderRadius: 2,
    padding: 8,
    zIndex: 20,
  },
});
