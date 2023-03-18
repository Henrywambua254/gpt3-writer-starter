import Head from 'next/head';
import styles from './contact.module.css';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic
  };

  return (
    <div>
      <Head>
        <title>Contact Us</title>
      </Head>

      <div className={styles.container}>
        <h1>Contact Us</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Contact;