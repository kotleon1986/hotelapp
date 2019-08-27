<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $service;

    /**
     * Generic function for returning json data.
     *
     * @param $data
     * @param null $message
     * @param bool $success
     * @return \Illuminate\Http\JsonResponse
     */
    protected function json($data, $message = null, $success = true) {
        $response = [
            'success' => $success
        ];

        if(gettype($data) == 'string' && !$message) {
            $response['message'] = $data;
        } else {
            $response['data'] = $data;

            if ($message) {
                $response['message'] = $message;
            }
        }

        return response()->json($response);
    }
}
