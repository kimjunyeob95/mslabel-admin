import axios from "axios";
import { API_BASE_URL } from "../utils/constants/env";

export const instance = axios.create({ baseURL: API_BASE_URL });
