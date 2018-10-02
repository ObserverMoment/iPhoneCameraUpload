import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import InnovationList from '../components/InnovationList';

import { colors, fonts } from '../assets/styles/variables';

import { getInnovations } from '../api';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innovations: [],
      pageNumber: 0,
      perPage: 8
    }
  }

  // The top level object coming in here is the Partner.
  handleData = (partners) => {
    const innovations = partners
      ? partners.map(partner => (
          { partnerId: partner.id, name: partner.innovation.sprintName, innovationId: partner.innovation.id }
        ))
      : []
    this.setState({ innovations });
  }

  componentDidMount = () => {
    getInnovations((innovations) => this.handleData(innovations));
  }

  render() {
    const { innovations, pageNumber, perPage } = this.state;
    const { navigation } = this.props;
    // Split innovations into an array per page.
    const totalPages = Math.ceil(innovations.length / perPage);
    const displayInnovations = innovations.length > 8 ? innovations.slice(perPage * pageNumber, perPage * pageNumber + perPage) : innovations;

    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.heading}>Select an Innovation</Text>
        <View style={styles.innovationListContainer}>
          <InnovationList innovations={displayInnovations} navigation={navigation} />
          <View style={styles.paginationContainer}>
            <View style={styles.pagination}>
              {totalPages > 1 && [...Array(totalPages).keys()].map(pageNumber => (
                <TouchableOpacity
                  key={`innovations-${pageNumber}`}
                  onPress={() => this.setState({ pageNumber })}
                  style={styles.paginateButton}
                >
                  <Text style={styles.paginateButtonText}>{pageNumber + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    color: colors.primaryText,
    fontSize: fonts.h1,
    textAlign: 'center',
    marginTop: 10,
  },
  innovationListContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5
  },
  paginationContainer: {
    alignItems: 'center',
  },
  pagination: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#e7e7e7',
    borderRadius: 10,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  paginateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    margin: 6,
    backgroundColor: '#303f49',
    borderRadius: 15
  },
  paginateButtonText: {
    color: 'white'
  }
})
