import { globalBackground } from "../state";
import { View } from "@lightningjs/solid";
import { createEffect, on } from "solid-js";

export default function Background() {
  let bg1, bg2;
  let active = 0;
  const alpha = 1;
  const bgStyle = { alpha, color: '#ffffffff' };
  const animationSettings = { duration: 1000, easing: 'ease-in-out' };
  const gradientStyle = {
    linearGradient:
    {
      angle: 180,
      stops: [0.1, 1],
      colors: [
        '#000000aa', '#00000000',
      ],
    }
  }

  function onLoad(elm, {width, height}) {
    console.log('LOADED: ', elm, width, height);
  }
  createEffect(on(globalBackground, (img) => {
    if (img.startsWith('#')) {
      bg1.color = img;
      bg1.src = '';
      bg1.alpha = 1;
      active = 1;
      bg2.alpha = 0;
      return;
    }

    if (active === 0) {
      bg1.src = img;
      active = 1;
      return;
    }

    if (active === 1) {
      bg2.src = img;
      active = 2;
      // array animation works
      bg2.alpha = [alpha];
      bg1.alpha = [0];
      return;
    }

    if (active === 2) {
      bg1.src = img;
      active = 1;
      // or use the animate property
      bg1.alpha = alpha;
      bg2.alpha = 0;
    }
  }, { defer: true}))

  return (<>
    <View onLoad={onLoad}
    ref={bg1} animate animationSettings={animationSettings} style={bgStyle} />
    <View ref={bg2} animate animationSettings={animationSettings} style={bgStyle} alpha="0" />
    <View style={gradientStyle} />
  </>);
}
