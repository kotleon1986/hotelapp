<?php

namespace App\Services\Common;

use Illuminate\Database\Query\Builder;

class TableService
{
    /**
     * Generate data for data table.
     * Automatically sort/filter data based on request parameters.
     *
     * @param Builder $builder
     * @param array $searchColumns
     * @return array
     */
    public function generate(Builder $builder, array $searchColumns = [])
    {
        $sort = request()->sort;
        $search = request()->search;
        $size = request()->size;

        if ($search && $searchColumns) {
            foreach($searchColumns as $searchColumn) {
                $builder->orWhere($searchColumn, 'like', "%$search%");
            }
        }

        if($sort) {
            $sort = explode(':', $sort);
            $builder->orderBy($sort[0], $sort[1]);
        }

        $data = $builder->paginate($size);
        return [
            'data' => $data->items(),
            'total' => $data->total()
        ];
    }
}