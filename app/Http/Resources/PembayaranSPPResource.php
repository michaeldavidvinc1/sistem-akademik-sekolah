<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PembayaranSPPResource extends JsonResource
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
            'siswa' => new SiswaResource($this->whenLoaded('siswa')),
            'jumlah' => $this->jumlah,
            'bukti_bayar' => $this->bukti_bayar && !(str_starts_with($this->bukti_bayar, 'http')) ?
            Storage::url($this->bukti_bayar) : $this->bukti_bayar,
            'tanggal_pembayaran' => (new Carbon($this->tanggal_pembayaran))->format('Y-m-d'),
            'deskripsi' => $this->deskripsi,
            'status_pembayaran' => $this->status_pembayaran,
            'created_at' => (new Carbon($this->created_at))->diffForHumans(),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
