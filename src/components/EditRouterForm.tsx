import React, { useState, useEffect } from "react";
import RouterForm from "./RouterForm";
import { useNavigate, useParams } from "react-router-dom";
import { Router } from "../types/router";
import { fetchRouter, updateRouter } from "../apiService/api";

const EditRouterForm = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState<Partial<Router> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const onSubmit = async (values: Partial<Router>) => {
    try {
      setLoading(true);
      const res = await updateRouter({
        ...values,
        updatedAt: new Date().toLocaleString(),
      });
      navigate("/");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getRouter = async (id: string) => {
      try {
        setLoading(true);
        const router = await fetchRouter(id);
        setFormValues({ ...router });
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    id && getRouter(id);
  }, [id]);

  if (loading || !formValues) return <p>Loading...</p>;

  return (
    <RouterForm initialValues={formValues} onSubmit={onSubmit}>
      submit
    </RouterForm>
  );
};

export default EditRouterForm;
