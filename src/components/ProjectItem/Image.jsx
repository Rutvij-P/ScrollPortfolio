import React from 'react'

export default function Image({ url, opacity, parallaxPos, scale, rotationPosition }) {
  return (
    <img 
    
    src={url}

    style = {{
        opacity: opacity,
        transform: `translate3d(${parallaxPos.x}px, ${parallaxPos.y}px, 0px) rotate(${rotationPosition}deg) scale(${scale})`
    }}
    />
  )
}
