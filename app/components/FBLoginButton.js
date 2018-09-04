import React, { Component } from 'react';
import { View } from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk';

export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
      <FBButtonWrapper>
<Button
  text={I18n.t('welcome.LOGIN_WITH_FACEBOOK')}
  width={widthPercentageToDP('59%')}
  fontSize={heightPercentageToDP('2.85%')}
  onClick={this.facebookLogin}
  backgroundColor={colors.blue}
  textColor={colors.white}
  padding={`${heightPercentageToDP('2.7%')} ${heightPercentageToDP('3.2%')}`}
  borderRadius={widthPercentageToDP('10%')}
/>
</FBButtonWrapper>
      </View>
    );
  }
};

module.exports = FBLoginButton;
