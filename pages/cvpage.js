<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">

<!-- Logo Area and Navigation Menu -->
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        My CV
      </h1>
      <nav class="navbar">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="#">Home</a>
            <a class="navbar-item" href="#">About</a>
            <a class="navbar-item" href="#">Contact</a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</section>

<!-- Form to Collect User Details -->
<section class="section">
  <div class="container">
    <h2 class="title is-2">Enter Your Details</h2>
    <form action="/submit" method="POST">
      <div class="field">
        <label class="label">Full Name</label>
        <div class="control">
          <input class="input" type="text" name="fullname" placeholder="Enter your full name">
        </div>
      </div>
      <div class="field">
        <label class="label">Email Address</label>
        <div class="control">
          <input class="input" type="email" name="email" placeholder="Enter your email address">
        </div>
      </div>
      <div class="field">
        <label class="label">Phone Number</label>
        <div class="control">
          <input class="input" type="tel" name="phone" placeholder="Enter your phone number">
        </div>
      </div>
      <div class="field">
        <label class="label">Education</label>
        <div class="control">
          <input class="input" type="text" name="education" placeholder="Enter your highest education">
        </div>
      </div>
      <div class="field">
        <label class="label">Work Experience</label>
        <div class="control">
          <textarea class="textarea" name="workexp" placeholder="Enter your work experience"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Skills</label>
        <div class="control">
          <textarea class="textarea" name="skills" placeholder="Enter your skills"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Achievements</label>
        <div class="control">
          <textarea class="textarea" name="achievements" placeholder="Enter your achievements"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</section>