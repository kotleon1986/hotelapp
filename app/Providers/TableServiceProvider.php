<?php

namespace App\Providers;

use App\Services\Common\TableService;
use Illuminate\Support\ServiceProvider;

class TableServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        return app()->bind('Table', function () {
            return new TableService();
        });
    }
}
