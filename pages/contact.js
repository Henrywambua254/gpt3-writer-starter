import Head from 'next/head';
import styles from './contact.module.css';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us | My Website</title>
      </Head>
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us at the following phone number:</p>
      <a href="tel:0715709676">0715709676</a>
    </div>
  );
};

export default Contact;
