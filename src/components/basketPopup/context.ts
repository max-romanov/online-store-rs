import React from "react";
import {Errors} from "./errors";

export const ErrorsContext = React.createContext({errors: new Errors(true)})
