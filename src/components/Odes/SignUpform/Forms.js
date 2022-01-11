import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const FormOne = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.one }, { errors: true });
  }, []);

  return (
    <form>
      <input
        name="example"
        defaultValue="test"
        ref={register({ required: true, minLength: 2 })}
      />
    </form>
  );
};

export const FormTwo = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.two }, { errors: true });
  }, []);

  return (
    <form>
      <input
        name="example"
        defaultValue="test"
        ref={register({ required: true, maxLength: 20 })}
      />
    </form>
  );
};

export const FormThree = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.three }, { errors: true });
  }, []);

  return (
    <form>
      <input
        name="example"
        defaultValue="test"
        ref={register({ required: true, maxLength: 20 })}
      />
    </form>
  );
};