// To avoid typing the 'type' and 'payload' keys for every dispatch
// Optimisation to reduce human errors
export const createAction = (type, payload) => ({ type, payload });
