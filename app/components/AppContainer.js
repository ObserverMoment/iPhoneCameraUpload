import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      showLoader: false,
      notification: null,
    }
  }

  render() {
    const { showLoader, notification } = this.state;
    const { children } = this.props;
    return (
      <View style={styles.pageContainer}>
        <View>{children}</View>
        <View>
          {showLoader && <Loader />}
          {notification && <Notifier />}
        </View>
      </View>
    )
  }
}

export default AppContainer;

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 40,
    flex: 1,
    backgroundColor: colors.appBackground,
    padding: 5
  }
})
