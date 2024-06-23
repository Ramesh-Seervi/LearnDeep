import BackgroundService from 'react-native-background-actions';
import notifee from '@notifee/react-native';

// Helper function to simulate a sleep or delay
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Background task that performs some intensive work
const veryIntensiveTask = async (taskDataArguments) => {
  const { delay } = taskDataArguments;

  for (let i = 0; i < 100; i++) { // Example loop for task iterations
    console.log(`Background Task Iteration: ${i}`);
    
    await sleep(delay);
  } 
};

// Function to start the background task with notification
const startBackgroundTask = async () => {
  const options = {
    taskName: 'BackgroundTaskExample',
    taskTitle: 'Background Task Running',
    taskDesc: 'Performing intensive work in the background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 1000, // Delay between task iterations in milliseconds
    },
  };

  // Starting the background task
  await BackgroundService.start(veryIntensiveTask, options);

  // Displaying a notification using notifee
  await notifee.displayNotification({
    title: 'Background Task Started',
    body: 'Your background task is running successfully!',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // Ensure this icon exists in your resources
      color: '#ff00ff', // Notification color
    },
    ios: {
      foregroundPresentationOptions: {
        banner: true,
        list: true,
      },
    },
  });
};

// Function to stop the background task
const stopBackgroundTask = async () => {
  await BackgroundService.stop();

  // Optionally, you can display a notification when the task stops
  await notifee.displayNotification({
    title: 'Background Task Stopped',
    body: 'Your background task has been stopped.',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher',
      color: '#ff0000',
    },
    ios: {
      foregroundPresentationOptions: {
        banner: true,
        list: true,
      },
    },
  });
};

export { startBackgroundTask, stopBackgroundTask };
