import React from 'react'; 
import { View, Image, StyleSheet, ImageBackground } from 'react-native';


const Detail = (props) => { 
  const { route } = props;
  const  {product}  = route.params;

 const renderProduct = () => {
    if (!route || !product || !product.id) {
        return <></>;
      }
    
      if (product.id) {
        return (
          <View style={styles.imageContainer}>
            <ImageBackground resizeMode={'contain'} style={styles.image} source={{ uri: product.image }} />
          </View>
        );
      } 
    
      return <></>;
}

return (
    <AppContainer padded={false} backgroundColor={'#fff'}>
        {renderProduct()}
    </AppContainer>
)
  
};

const styles = StyleSheet.create({
  imageContainer: { 
    flex: 1,
  },
  image: { 
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  videoContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  videoElement: {
    flex: 1
  },
  videoOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },  
});

export default Detail;