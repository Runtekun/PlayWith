<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Sanctumのstateful判定(EnsureFrontendRequestsAreStateful)がRefererを見るため、
        // SANCTUM_STATEFUL_DOMAINSに登録済みのオリジンをテストのデフォルトとして付与する。
        $this->withHeader('Referer', 'http://localhost:3002');
    }
}
