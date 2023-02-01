import React, {Component} from "react";
import {Text, View} from "react-native";
import PropTypes from "prop-types";
import axios from 'axios';

export default class GenresPlugin extends Component {
  constructor(props) {
    super(props);
    this.appId = props.appId;
    this.appUrl = props.appUrl;
    this.state = {
      genres: [],
    }
  }

  componentDidMount = async () => {
    try {
      const genres = await this.getGenres();
      this.setState({genres});
    } catch (e) {
      console.log('error in componentDidMount in GenresPlugin');
      console.log(e);
    }
  }

  render() {
    const {styles, onPress} = this.props;
    return (
      <View style={genreStyles.categoryContentStyle}>
        <View style={[genreStyles.typesOfGenres]}>
          {this.state.genres.map(item => (
            <Text
              key={item.name}
              onPress={onPress}
              style={[
                genreStyles.typesOfMoviesAndWebSeriesWrapStyle,
                styles && styles,
                { color: 'white', fontSize: 15.0 },
                { textTransform: "capitalize" },
              ]}>
              {item.name}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  getGenres = async () => {
    try {
      const {appId, appUrl} = this.props;
      const {data} =  await new GenresSDK(appId, appUrl).getGenres();
      return  data;
    } catch (error) {
      console.log('error while loading genres');
      console.log(error);
    }
  };

}

GenresPlugin.propTypes = {visible: PropTypes.bool.isRequired};

const genreStyles = StyleSheet.create({
  categoryContentStyle: {
    borderRadius: 7,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    margin: 10,
  },
  typesOfGenres: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typesOfMoviesAndWebSeriesWrapStyle: {
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  }
});

class GenresSDK extends SDK {
  constructor(appId, appUrl) {
    super(appId, appUrl);
  }

  getGenres = async () => {
    try {
      try {
        return await this.get('genres');
      } catch (e) {
        console.error('error while getting genres');
        console.log(e);
      }
    } catch (error) {
      console.log('error while loading genres');
      console.log(error);
    }
  };

}

class SDK {
  headers = {
    'Content-Type': 'application/json',
  };

  constructor(appId, appUrl) {
    this.appId = appId;
    this.baseApiUrl = this.getBaseApiUrl(appUrl);
    this.headers['x-consumer'] = 'phone';
    this.headers['app-id'] = this.appId;
  }

  async send(method, slug, data = null) {
    try {
      const url = slug ? this.baseApiUrl + slug : this.baseApiUrl;
      const options = {
        method: method,
        url: url,
        preambleCRLF: true,
        postambleCRLF: true,
        headers: this.headers,
      };
      data ? (options['data'] = data) : '';
      return (await axios(options)).data;
    } catch (error) {
      console.log('error while sending request');
      console.log(error);
    }
  }

  async get(slug) {
    return await this.send('get', slug);
  }

  async getAll(slug) {
    return await this.send('get', slug);
  }

  async post(data, slug) {
    return await this.send('post', slug, data);
  }

  async put(data, slug) {
    return await this.send('put', slug, data);
  }

  async delete(slug) {
    return await this.send('delete', slug);
  }

  getBaseApiUrl(appUrl) {
    if(appUrl.includes('.dev.')) {
      return 'https://dev-apis.mogiio.com/';
    }
    if(appUrl.includes('.qa.')) {
      return 'https://qa-apis.mogiio.com/';
    }
    if(appUrl.includes('.stag.')) {
      return 'https://stag-apis.mogiio.com/';
    }
    return 'https://apis.mogiio.com/';
  }
}

