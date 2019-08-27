<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Prices\PriceRequest;
use App\Services\PriceList\PriceListService;
use App\Http\Controllers\Controller;

class PriceListController extends Controller
{
    /**
     * PriceListController constructor.
     *
     * @param PriceListService $priceListService
     */
    public function __construct(PriceListService $priceListService)
    {
        $this->service = $priceListService;
    }

    /**
     * Get list for table request.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json($this->service->getPricesForDataTable());
    }

    /**
     * Get single price request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function single($id)
    {
        $price = $this->service->getSinglePrice($id);
        return $this->json($price);
    }

    /**
     * Save price request.
     *
     * @param PriceRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(PriceRequest $request)
    {
        $price = $this->service->savePrice($request->all());
        return $this->json($price, 'Price saved successfully');
    }

    /**
     * Update price request.
     *
     * @param $id
     * @param PriceRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, PriceRequest $request)
    {
        $price = $this->service->savePrice($request->all(), $id);
        return $this->json($price, 'Price updated successfully');
    }

    /**
     * Delete price request.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $this->service->deletePrice($id);
        return $this->json('Price deleted successfully');
    }
}
