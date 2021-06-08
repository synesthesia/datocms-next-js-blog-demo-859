import React from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
interface Values {
    firstName: string;
    lastName: string;
    email: string;
    consent:  boolean;
  }

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    consent: Yup.bool().oneOf([true], "You must consent to us doing stuff with your data"),
  });

export default function ContactForm(){
return(
    <div className="max-w-2xl mx-auto my-10">
      <div className="prose prose-lg prose-blue">
        <h2>Find out more</h2>
        <p>If this content has resonated with you, and you'd like to find out more, please fill in your details below</p>
        <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          consent: false
        }}
        validationSchema={SignupSchema}
        onSubmit={async (
          values:Values,
          { setSubmitting }: FormikHelpers<Values>
          ) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
        
            const options = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(values)
            };

            try {
              const response = await fetch("/api/form", options);
              let result = await response.json();
              alert("Backend API returns: \n"+JSON.stringify(result, null, 2));
              setSubmitting(false);
          } catch (error) {
              console.log(error);
          }
        }}
        
      >
         {({ errors, touched }) => (
        <Form  className = "flex-col items-center justify-centerbg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <Field id="firstName" name="firstName" placeholder="First Name" type="text" className="px-4 py-3 rounded-full" />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <Field id="lastName" name="lastName" placeholder="Last Name" type="text" className="px-4 py-3 rounded-full"/>
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
            </div>
            <div className="mb-4">
                <Field
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    className="px-4 py-3 rounded-full"
                />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className="mb-4">
              <label className="block" htmlFor="consent" >I agree you can do stuff with my data</label>
              <Field id="consent" name="consent" type="checkbox" className = "px-4 py-3" />
              {errors.consent && touched.consent ? <div>{errors.consent}</div> : null}
            </div>
            <div className=" mb-4">
                <button type="submit" className="py-2 px-4 bg-transparent hover:bg-blue-500 hover:text-white text-blue-700 rounded-full border border-solid border-blue-500">Submit</button>
            </div>
        </Form>
        )}
      </Formik>
      </div>
    </div>
)
}