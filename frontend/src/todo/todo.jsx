import React from "react";
import PageHeader from "../template/pageHeader";

import TodoForm from "./todoForm";
import Lista from "./lista";

export default (props) => (
  <div>
    <PageHeader name="Tarefas" small="Cadastro" />
    <TodoForm />
    <Lista />
  </div>
);
