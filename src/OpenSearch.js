import React from 'react'
import { Link } from 'react-router-dom'

function OpenSearch(props) {
  const { className, pathToSearch } = props
  return (
    <div className={className}>
      <button> 
        <Link to={pathToSearch} style={{display: "block", height: "100%"}}></Link>
      </button>
    </div>
  )
}
            
export default OpenSearch