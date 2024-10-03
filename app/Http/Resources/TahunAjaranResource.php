<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TahunAjaranResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tahun_ajaran' => $this->tahun_ajaran,
            'tanggal_mulai' => (new Carbon($this->tanggal_mulai))->format('Y-m-d'),
            'tanggal_selesai' => (new Carbon($this->tanggal_selesai))->format('Y-m-d'),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
