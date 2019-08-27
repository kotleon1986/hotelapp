<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;


class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param Exception $exception
     * @return mixed|void
     * @throws Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $errors = [];

        if ($exception instanceof AuthenticationException) {
            $code = 401;
            $message = 'Please login to proceed';
        } else if ($exception instanceof ValidationException) {
            $code = 400;
            $message = 'Invalid request. Please check the data';
            $errors = $exception->errors();
        } else {
            $code = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : $exception->getCode();
            if (!$code) {
                $code = 422;
            }

            // If app is running locally, show real error, otherwise show generic error message to user.
            $message = (app()->environment() == 'local') ? $exception->getMessage() : 'Failed to process request';
        }

        // error response data
        $response = [
            'success' => false,
            'message' => $message,
        ];

        // include validation errors, if exist
        if($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }
}
