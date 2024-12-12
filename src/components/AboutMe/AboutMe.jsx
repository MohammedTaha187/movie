import React from "react";
import "./AboutMe.css";
import profilePic from "../../assets/WhatsApp Image 2024-05-12 at 21.22.34_2f6bc6fd.jpg"; 

export default function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="about-me-header">
        <h1>About Me / عني</h1>
      </div>
      <div className="about-me-content">
        <div className="profile-section">
          <img src={profilePic} alt="Mohamed Taha" className="profile-pic" />
          <h2>Mohamed Taha</h2>
          <h3>Full Stack Developer</h3>
          <p>
            Passionate about crafting efficient, scalable, and user-friendly web applications. 
            I specialize in both front-end and back-end technologies, always striving for excellence 
            and continuous learning.
          </p>
          <p>
            شغوف بتطوير تطبيقات ويب فعالة وقابلة للتوسع وسهلة الاستخدام. 
            متخصص في تقنيات الواجهة الأمامية والخلفية، وأسعى دائمًا إلى التميز والتعلم المستمر.
          </p>
        </div>
      </div>
      <div className="about-me-footer">
        <p>© 2024 Mohamed Taha. All rights reserved.</p>
      </div>
    </div>
  );
}
