import { Component } from '@angular/core';

@Component({
  selector: 'app-mere-projects',
  templateUrl: './mere-projects.component.html',
  styleUrls: ['./mere-projects.component.css']
})
export class MereProjectsComponent {
  projects: Project[] = [
    {
      title: "Portfolio Website",
      imageUrl: "./assets/images/portfolio.jpg",
      appUrl: "https://deepakgautam-ruddy.vercel.app/",
      gitUrl: "https://github.com/your-username/project-one",
      intro: "A personal portfolio website designed to showcase my skills, projects, and achievements.",
      techStack: ["HTML", "CSS", "Bootstrap", "AngularJS","etc"],
      features: [
        "Clean and responsive UI with a mobile-first design",
        "Dynamic and interactive components powered by AngularJS",
        "Seamless navigation and engaging user experience"
      ]
    },
    {
      title: "HappyDost.in – Website Monitoring Application",
      imageUrl: "./assets/images/happydost.jpg",
      appUrl: "https://happydost.in",
      gitUrl: "",
      intro: "A public platform built at Exsete for monitoring website uptime, performance, and security.",
      techStack: ["HTML", "CSS", "Bootstrap", "AngularJS", "Node.js", "Express.js", "MongoDB", "SuiteCRM", "Elasticsearch","etc"],
      features: [
        "Developed collaboratively with teammates Afifa and Raja",
        "Integrated Puppeteer, Ping, SSL Check, and Nmap for monitoring",
        "Automated performance checks and real-time issue detection",
        "Efficient data handling with Elasticsearch and SuiteCRM"
      ]
    },
    {
      title: "SYRN.in – Website for Enterprise Software",
      imageUrl: "./assets/images/syrn.jpg",
      appUrl: "https://syrn.in",
      gitUrl: "",
      intro: "The official website for SYRN, showcasing the enterprise software product.",
      techStack: ["HTML", "CSS", "Bootstrap", "AngularJS","etc"],
      features: [
        "Built collaboratively with teammate Afifa",
        "Implemented unique horizontal scrolling with Locomotive Scroll",
        "Reach Us form integrated with Google Cloud Functions",
        "Leads automatically stored in Google Spreadsheets"
      ]
    },
    {
      title: "Key Builder – Resume Builder Application (Ongoing Project)",
      imageUrl: "./assets/images/keybuilder.jpg",
      appUrl: "https://example.com/project-four",
      gitUrl: "",
      intro: "An ongoing independent project: a smart resume-building application.",
      techStack: ["HTML", "CSS", "AngularJS", "Node.js", "Express.js", "MongoDB", "Puppeteer", "ChatGPT APIs", "etc"],
      features: [
        "User account creation with guided form input",
        "Automatic rectification of user-provided data points",
        "Resume generation with predefined professional templates",
        "AI-powered content refinement using ChatGPT APIs"
      ]
    }
  ];
}

interface Project {
  title: string;
  imageUrl: string;
  appUrl: string;
  gitUrl: string;
  intro: string;
  techStack: string[];
  features: string[];
}


