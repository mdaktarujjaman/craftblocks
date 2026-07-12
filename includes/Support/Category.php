<?php
/**
 * Registers a custom block category for CraftBlocks blocks.
 *
 * @package CraftBlocks\Support
 */

namespace CraftBlocks\Support;

// Prevent direct access to this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Category
 *
 * Adds a dedicated "CraftBlocks" category so all our blocks
 * group together in the block inserter, instead of scattering
 * across WordPress's default categories.
 */
final class Category {

	/**
	 * Register the custom block category.
	 *
	 * @param array $categories Existing block categories.
	 * @return array Modified block categories.
	 */
	public function register_category( array $categories ): array {
		return array_merge(
			array(
				array(
					'slug'  => 'craftblocks',
					'title' => __( 'CraftBlocks', 'craftblocks' ),
					'icon'  => 'layout',
				),
			),
			$categories
		);
	}
}