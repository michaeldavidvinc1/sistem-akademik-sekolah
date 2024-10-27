<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ResetDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:reset-seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('migrate:fresh', ['--seed' => true]);

        $this->call('db:seed', ['--class' => 'JurusanSeeder']);
        $this->call('db:seed', ['--class' => 'KelasSeeder']);
        $this->call('db:seed', ['--class' => 'SiswaSeeder']);
        $this->call('db:seed', ['--class' => 'TahunAjaranSeeder']);
        $this->call('db:seed', ['--class' => 'MataPelajaranSeeder']);
        $this->call('db:seed', ['--class' => 'KelasMataPelajaranSeeder']);
        $this->call('db:seed', ['--class' => 'IdentitasSekolahSeeder']);


        $this->info('Database reset and specific seeders have been run successfully.');

        return 0;
    }
}
