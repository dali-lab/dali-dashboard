import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Isotope from 'isotope-layout';
import axios from 'axios';
import env from '../components/environment';
import ProjectCard from '../components/cards/project_card';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '17S',
      projects: [],
    };

    this.getProjects().then((projects) => {
      this.setState({ projects });
    });
  }

  initializeGrid() {
    let grid = document.querySelector('.grid');
    new Isotope(grid, {
      itemSelector: '.grid-item',
      masonry: {
        columnWidth: 400,
        gutter: 50,
        // fitWidth: true
      }
    })
  }

  getProjects() {
    return new Promise((resolve, reject) => {
      axios.get(`${env.serverURL}/api/projects`, {
        headers: { authorization: window.localStorage.token },
      }).then((response) => {
        resolve(response.data);
      });
    });
  }
  render() {
    this.initializeGrid();
    // const displayedProjects = ['med-width', 'long-height', 'block', 'block', 'long-width'].map((item) => {
    //   return (
    //     <ProjectCard project={item.toString()} blockSize={item} />
    //   );
    // });
    
    const displayedProjects = this.state.projects.map((project) => {
      return (
        <div id={project.id}>
          <ProjectCard project={project} blockSize={'long-width'}/>
        </div>
      );
    });

      return (
        <div className="grid" data-isotope='{ "itemSelector": ".grid-item", "masonry": { "columnWidth": 400, "gutter": 50 } }'>
          {displayedProjects}
        </div>
      );
    }
}

export default Projects;
