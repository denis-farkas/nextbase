import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import isEmailValidator from "validator/lib/isEmail";

import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("prénom est requis"),
    lastName: Yup.string().required("nom est requis"),
    email: Yup.string()
      .email("le format est érroné")
      .required("Email est requis")
      .test(
        "is-valid",
        (message) => `${message.path} est érroné`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new Yup.ValidationError("Valeur erronée")
      ),
    password: Yup.string()
      .required("Password est requis")
      .min(6, "Le mot de passe doit avoir au moins six caractéres"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        alertService.success("Registration successful", true);
        router.push("login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Inscription</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Prénom</label>
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                name="lastName"
                type="text"
                {...register("lastName")}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Enregistrer
            </button>
            <Link href="/account/login" className="btn btn-link">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
