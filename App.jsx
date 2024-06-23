import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { startBackgroundTask, stopBackgroundTask } from './BackgroudAction'; // Adjust the path as necessary

const App = () => {
  const [isBackgroundTaskRunning, setIsBackgroundTaskRunning] = useState(false);

  const handleStartBackgroundTask = async () => {
    await startBackgroundTask();
    setIsBackgroundTaskRunning(true);
    console.log('Background task started!');
  };

  const handleStopBackgroundTask = async () => {
    await stopBackgroundTask();
    setIsBackgroundTaskRunning(false);
    console.log('Background task stopped!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App</Text>
      {isBackgroundTaskRunning ? (
        <Button title="Stop Background Task" onPress={handleStopBackgroundTask} />
      ) : (
        <Button title="Start Background Task" onPress={handleStartBackgroundTask} />
      )}
    </View>
  );
};

export default App;
