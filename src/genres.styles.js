import {StyleSheet} from "react-native";

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

export default genreStyles;
