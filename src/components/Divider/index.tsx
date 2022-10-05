import React from 'react'

interface DProps {
    color?: string
}

const Divider = ({color} : DProps) => {
  return (
    <hr style={{
        border: 'none',
        height: '4px',
        background: color? color : 'black'
    }}/>
  )
}

export default Divider