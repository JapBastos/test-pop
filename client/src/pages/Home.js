import React from 'react';
import { Link } from 'react-router-dom'

const Home = () =>
  <div className="d-flex justify-content-center flex-column">
    <h1>Sound in js app examples</h1>
    <div className="d-flex flex-column">
      <h3 className="p-1">
        <Link to="/audio" > Audio Client:
          <span className="small">Sound Streaming</span>
        </Link>
      </h3>
    </div>
  </div>;

export { Home };