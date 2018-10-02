import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../assets/styles/variables';

const Button = ({ title, type, onPress }) => {
  const styleSheet = StyleSheet.create({
    button: { ...defaultStyles.button, ...customStyles[type].button },
    text: { ...defaultStyles.text, ...customStyles[type].text }
  });
  return (
    <TouchableOpacity onPress={onPress} style={styleSheet.button}>
      <Text style={styleSheet.text}>{title}</Text>
    </TouchableOpacity>
  )
};

export default Button;

const defaultStyles = {
  button: {
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    shadowOffset: { width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: fonts.buttonSize,
  }
};

const customStyles = {
  primary: {
    button: {
      backgroundColor: colors.primaryTone,
    },
    text: {
      color: colors.primaryText,
    }
  },
  secondary: {
    button: {
      backgroundColor: colors.secondaryTone,
    },
    text: {
      color: colors.primaryText,
    }
  },
  tertiary: {
    button: {
      backgroundColor: 'transparent',
      borderColor: colors.secondaryTone
    },
    text: {
      color: colors.tertiaryText
    }
  },
  warning: {
    button: {
      backgroundColor: 'transparent',
    }, text: {
      color: colors.tertiaryText
    }
  },
  textSmall: {
    button: {
      backgroundColor: 'transparent',
      padding: 2,
      margin: 2
    },
    text: {
      color: colors.secondaryText,
      fontSize: fonts.appFontSize
    }
  },
  textLarge: {
    button: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.secondaryText
    }
  }
};
