const User = require("../models/User");
const crypto = require("crypto");
const mailer = require("../../lib/mailer");
const { hash } = require("bcryptjs");

module.exports = {
  loginForm(req, res) {
    return res.render("session/login");
  },

  login(req, res) {
    req.session.userId = req.user.id;

    return res.redirect("/admin/recipes");
  },

  logout(req, res) {
    req.session.destroy();

    return res.redirect("/admin/recipes");
  },

  forgotPasswordForm(req, res) {
    return res.render("session/forgot-password");
  },

  async forgotPassword(req, res) {
    const user = req.user;

    try {
      const token = crypto.randomBytes(20).toString("hex");

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.updateFields(user.id, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        from: "admin@foodfy.com.br",
        to: user.email,
        subject: "Boas vindas do Foodfy",
        html:`
            <h2>Olá usuário!</h2>
            <p>Seja bem vindx ao Foodfy, o seu site de receitas!</p><br>
            <p>A sua senha pode ser alterada em seu perfil.</p>
            
            <p>
                <a href="http://localhost:3000/admin/users/reset-password?token=${token}" target="_blank">
                    RECUPERAR SENHA
                </a>
            </p>
        `
      });

      return res.render("session/forgot-password", {
        success: "Verifique seu email para resetar sua senha!",
      });
    } catch (error) {
      console.error(error);
      return res.render("session/forgot-password", {
        error: "Erro inesperado, tente novamente!",
      });
    }
  },

  resetPasswordForm(req, res) {
    return res.render("session/reset-password", { token: req.query.token });
  },

  async resetPassword(req, res) {
    const user = req.user;
    const { password, token } = req.body;

    try {
      const newPassword = await hash(password, 8);
      
      await User.updateFields(user.id, {
          password: newPassword,
          reset_token: "",
          reset_token_expires: "",
      });

      return res.render("session/login", {
          user: req.body,
          success: "Senha alterada com sucesso! Faça o seu login."
      });

    } catch (error) {

      console.error(error);

      return res.render("session/reset-password", {
        user: req.body,
        token,
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
};
