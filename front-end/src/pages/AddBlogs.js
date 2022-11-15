import Particles from "react-tsparticles";

import React from 'react';
   
function AddBlogs() {
  return (
    <div>
      Add Blogs
      <Particles
        params={{
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 1000,
              }
            },
          },
        }}
      />
   
    </div>
  );
}

export default AddBlogs;
