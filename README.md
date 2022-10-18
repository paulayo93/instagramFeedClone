
      <View style={{ flex: 1, minHeight: 400 }}>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}
          >
            <Animated.View>
              <ImageBackground
                style={{
                  aspectRatio: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={{
                  uri: image,
                }}
                resizeMode="contain"
              >
                <AnimatedImage
                  source={require("./../assets/images/heart.png")}
                  style={[styles.heart, rStyle]}
                  resizeMode={"center"}
                />
              </ImageBackground>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>



       <DoubleTap
        singleTap={() => {
          onSingleTap();
        }}
        doubleTap={() => {
          onDoubleTap();
        }}
        delay={200}
      >
        <Animated.View>
          <ImageBackground
            style={{
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={{
              uri: image,
            }}
            resizeMode="contain"
          >
            <AnimatedImage
              source={require("./../assets/images/heart.png")}
              style={[styles.heart, rStyle]}
              resizeMode={"center"}
            />
          </ImageBackground>
        </Animated.View>
      </DoubleTap>