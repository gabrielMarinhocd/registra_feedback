import express from 'express';
import { TransactionModel } from '../models/conection.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const { USER, SENHA } = process.env;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const grade = req.query;
    console.log(USER + ' ' + SENHA);

    const trasaction = new TransactionModel(req.query);
    await trasaction.save();

    await sendemail(grade);

    res.status(200).send('Salvo com sucesso!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const sendemail = (grade) => {
  const { name, email, menssagem, nota, data } = grade;
  const conteudoHTML = `<div style="background-color: #1a237e; 
  min-width: 150px; min-height: 50px; text-align: center; 
  color: white; font-size: 50px; font-family: 'Abril Fatface', cursive;">
    <a style="color: inherit; text-decoration:none; " href="http://gabrielmarinho.site" target="_blank"
      rel="noopener noreferrer"> GM </a>
  </div>
  <div style="
    margin: 0, 3%, 0%, 3%;
  padding: 1%;
  display: flex;
  font-size: 25px;
  background-color: whitesmoke;
  font-family:'Helvética', Times, serif
  ">

    <p>
      Obrigado pelo feedback ${name} aqui está meu currículo caso queira dar uma olhada ou apresentar na empresa ou a um
      amigo.
      Mais de qualquer forma só o seu feedback já me ajudou muito. Espero melhorar meu site cada vez mais e com isso vou
      aperfeiçoando meus conhecimentos para me tornar um bom programdor.<br />
      Mais no geral e isso até mais. <span style='font-size:25px;'>&#9996;</span>
      <br />
      <br />
      Assinado Gabriel Marinho desenvolvedor e administrador do site <a href="http://gabrielmarinho.site"
        target="_blank" rel="noopener noreferrer"> gabrielmarinho.site</a>
    </p>


  </div>
  <div style="background-color: #1a237e; 
  min-width: 150px; min-height: 50px; text-align: center; 
  color: white; font-size: 50px; font-family: 'Abril Fatface', cursive; padding: 0.5%; padding: 5px; align-items: center;">

    <a id="link-email" href="https://www.linkedin.com/in/gabriel-marinho-5094bb132" target="_blank">
      <img style="width: 50px; height: 50px;" id="img-email"
        src="https://gabrielmarinho.site/Imagens/linkedin-sign_icon-icons.com_73508.png" class="img-responsive" /></a>
    <a id="link-github" href="https://github.com/gabrielMarinhocd/" target="_blank">
      <img style="width: 50px; height: 50px;" id="img-github"
        src="https://gabrielmarinho.site/Imagens/github-logo_icon-icons.com_73546.png" class="img-responsive" /></a>
    <a id="link-email" href="mailto:gabrielmarinhodossantoscd@gmail.com" target="_blank">
      <img style="width: 50px; height: 50px;" id="img-email"
        src="https://gabrielmarinho.site/Imagens/email-open-envelope-in-a-rounded-square_icon-icons.com_70497.png"
        class="img-responsive" /></a>
  </div>`;

  const $usuario = USER;
  const $senha = SENHA;

  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    auth: {
      user: $usuario,
      pass: $senha,
    },
  });

  const $destinatario = email;

  const mailOptions = {
    from: $usuario,
    to: [$destinatario, 'biel32771@gmail.com'],
    subject: `Obrigado pelo feedback ${name}`,
    html: conteudoHTML,
    attachments: [
      {
        path: './docs/Curriculo_Desenvolvedor-GABRIEL_MARINHO_DOS_SANTOS.pdf',
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
};

export default router;
