import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 16px;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 2px solid gray;
  :focus {
    outline: 2px solid rgba(100, 20, 255, 0.3);
  }
`;

const StyledError = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  border: 0;
  background: rebeccapurple;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  :focus {
    outline: 3px solid black;
  }
`;

const yearMax = new Date().getFullYear() - 18;
const yearMin = yearMax - 3;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .min(3, "Name must to contain atleast 3 characters")
    .max(40, "Name can have a maximum of 40 characters"),
  email: yup
    .string()
    .email("Valid email required")
    .required("Email is a required field"),
  dateOfBirth: yup
    .date()
    .required()
    .min(
      new Date(yearMin, 1, 1),
      `Date of birth should be after 1/1/${yearMin}`
    )
    .max(
      new Date(yearMax, 1, 1),
      `Date of birth should be before 1/1/${yearMax}`
    ),
  salary: yup
    .number()
    .required("Salary is a required field")
    .typeError("Should be numeric")
    .min(5000, "Salary should be more than 5000")
    .max(99999, "Salary cannot be over 99999")
});

const EmployeeForm = () => {
  const { formState, register, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  function handleFormSubmit(employeeDetails) {
    console.log(employeeDetails);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledInputContainer>
        <StyledLabel>Name:</StyledLabel>
        <StyledInput placeholder="Enter Name" {...register("name")} />
        {formState.errors["name"] && (
          <StyledError>{formState.errors["name"].message}</StyledError>
        )}
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledLabel>Email:</StyledLabel>
        <StyledInput placeholder="Enter Email" {...register("email")} />
        {formState.errors["email"] && (
          <StyledError>{formState.errors["email"].message}</StyledError>
        )}
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledLabel>Salary:</StyledLabel>
        <StyledInput placeholder="Enter Salary" {...register("salary")} />
        {formState.errors["salary"] && (
          <StyledError>{formState.errors["salary"].message}</StyledError>
        )}
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledLabel>Date of birth:</StyledLabel>
        <StyledInput {...register("dateOfBirth")} type="date" />
        {formState.errors["dateOfBirth"] && (
          <StyledError>{formState.errors["dateOfBirth"].message}</StyledError>
        )}
      </StyledInputContainer>
      <StyledButton>Submit</StyledButton>
    </form>
  );
};

export default EmployeeForm;
