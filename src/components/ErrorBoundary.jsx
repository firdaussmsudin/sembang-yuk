import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
    let error = useRouteError();
    console.log(error);
  return (
    <div><h1>Dang!</h1></div>
  )
}

export default ErrorBoundary