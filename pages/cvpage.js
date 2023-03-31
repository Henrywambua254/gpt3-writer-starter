import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setfullName] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [achievements, setAchievements] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [certificationName, setCertificationName] = useState('');
  const [issuingOrganization, setIssuingOrganization] = useState('');
  const [certificationDate, setCertificationDate] = useState('');
  const [awardName, setAwardName] = useState('');
  const [awardIssuingOrganization, setAwardIssuingOrganization] = useState('');
  const [awardDate, setAwardDate] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [technologiesUsed, setTechnologiesUsed] = useState('');
  const [projectAchievements, setProjectAchievements] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityRole, setActivityRole] = useState('');
  const [activityDates, setActivityDates] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name,
        address,
        email,
        phone,
        linkedin,
        degree,
        institution,
        major,
        gpa,
        graduationDate,
        company,
        position,
        jobDescription,
        startDate,
        endDate,
        achievements,
        technicalSkills,
        softSkills,
        certificationName,
        issuingOrganization,
        certificationDate,
        awardName,
        awardIssuingOrganization,
        awardDate,
        projectName,
        projectDescription,
        technologiesUsed,
        projectAchievements,
        activityName,
        activityDescription,
        activityRole,
        activityDates,
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <Head>
        <title> CV Writer | Henry</title>
      </Head>

      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>CV Writer</h1>
          </div>
          <div className="header-subtitle">
        <h2>Enter your details below:</h2>
      </div>
    </div>

    <div className="prompt-container">
      <div className="input-section">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Enter your full name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </div>

      <div className="input-section">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="input-section">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </div>

      <div className="input-section">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </div>

      <div className="input-section">
        <label htmlFor="work-experience">Work Experience</label>
        <textarea
          id="work-experience"
          name="work-experience"
          placeholder="Enter your work experience"
          onChange={(e) => setWorkExperience(e.target.value)}
          value={workExperience}
        />
      </div>

      <div className="input-section">
        <label htmlFor="education">Education</label>
        <textarea
          id="education"
          name="education"
          placeholder="Enter your education details"
          onChange={(e) => setEducation(e.target.value)}
          value={education}
        />
      </div>

      <div className="prompt-buttons">
        <a
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
            {isGenerating ? (
              <span className="loader"></span>
            ) : (
              <p>Generate</p>
            )}
          </div>
        </a>
      </div>

      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Generated CV</h3>
            </div>
          </div>

          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
    </div>

    <div className="badge-container grow">
      <a href="/">
        <div className="badge">
          <p>Built by Henry Wambua</p>
        </div>
      </a>
    </div>
  </div>
</div>
);
};

export default Home;
