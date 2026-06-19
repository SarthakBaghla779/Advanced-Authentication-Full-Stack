import * as Yup from "yup";
import { useField } from "formik";
import Input from "../components/input";

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name Must be atleast 3 Characters long!")
    .matches(/^[A-Za-z\s]+$/, "Name must only contain letters ")
    .max(50, "Name can't be too Long!")
    .required("Name is Required!"),
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Invalid E-mail Format!")
    .required("Email is Required!"),
  password: Yup.string()
    .min(6, "Password is too Short!")
    .matches(/[A-Z]/, "Must contain atleast one Uppercase Character")
    .matches(/[a-z]/, "Must contain atleast one Lowercase Character")
    .matches(/[0-9]/, "Must contain atleast Numeric Character")
    .required("Password is Required!"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Invalid E-mail Format!")
    .required("Email is Required!"),
  password: Yup.string()
    // .min(6, "Password is too Short!")
    // .matches(/[A-Z]/, "Must contain atleast one Uppercase Character")
    // .matches(/[a-z]/, "Must contain atleast one Lowercase Character")
    // .matches(/[0-9]/, "Must contain atleast Numeric Character")
    .required("Password is Required!"),
});

export const forgotSchema = Yup.object({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Invalid E-mail Format!")
    .required("Email is Required!"),
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password is too Short!")
    .matches(/[A-Z]/, "Must contain atleast one Uppercase Character")
    .matches(/[a-z]/, "Must contain atleast one Lowercase Character")
    .matches(/[0-9]/, "Must contain atleast Numeric Character")
    .required("Password is Required!"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not Match!")
    .required("Confirm password is Required!"),
});
