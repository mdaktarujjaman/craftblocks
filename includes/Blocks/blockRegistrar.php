<?php
/**
 * Auto-discovers and registers all blocks from the build directory.
 *
 * @package CraftBlocks\Blocks
 */

namespace CraftBlocks\Blocks;

// Prevent direct access to this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class BlockRegistrar
 *
 * Scans the /build directory for block.json files and registers
 * each one automatically, so new blocks never require manual
 * registration code in the plugin bootstrap.
 */
final class BlockRegistrar {

	/**
	 * Register all blocks found under the build directory.
	 *
	 * @return void
	 */
	public function register_blocks(): void {
		$build_path = CRAFTBLOCKS_PATH . 'build';

		if ( ! is_dir( $build_path ) ) {
			return;
		}

		$block_folders = glob( $build_path . '/*', GLOB_ONLYDIR );

		if ( empty( $block_folders ) ) {
			return;
		}

		foreach ( $block_folders as $block_folder ) {
			$block_json_path = $block_folder . '/block.json';

			if ( file_exists( $block_json_path ) ) {
				register_block_type( $block_folder );
			}
		}
	}
}