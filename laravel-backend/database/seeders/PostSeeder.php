<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class PostSeeder extends Seeder
{
    public function run()
    {
        $user = User::first();

        Post::create([
            'user_id' => $user->id,
            'title' => 'First Post',
            'content' => 'This is the content of the first post.',
        ]);

        Post::create([
            'user_id' => $user->id,
            'title' => 'Second Post',
            'content' => 'This is the content of the second post.',
        ]);

        Post::create([
            'user_id' => $user->id,
            'title' => 'Third Post',
            'content' => 'This is the content of the third post.',
        ]);
    }
}