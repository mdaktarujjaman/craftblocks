<?php
/**
 * Main plugin class. This class manages the entire plugin lifecycle.
 *
 * @package CraftBlocks\Core
 */

namespace CraftBlocks\Core;

// Prevent direct access to this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Plugin
 *
 * Uses the Singleton pattern to initialize the plugin,
 * ensuring only one instance is ever created.
 */
final class Plugin {

	/**
	 * Static property holding the singleton instance.
	 *
	 * @var Plugin|null
	 */
	private static ?Plugin $instance = null;

    /**
	 * Hook loader instance.
	 *
	 * @var Loader
	 */
	private Loader $loader;

	/**
	 * Constructor is kept private so that outside code
	 * cannot directly create an instance using `new Plugin()`.
	 */
	private function __construct() {
		$this->loader = new Loader();
		$this->define_hooks();
		$this->loader->run();
	}

	/**
	 * Static method to get/create the singleton instance.
	 *
	 * @return Plugin
	 */
	public static function get_instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}
    

	/**
	 * Define all hooks for the plugin.
	 *
	 * @return void
	 */
	private function define_hooks(): void {
		$this->loader->add_action( 'init', $this, 'load_textdomain' );
		$this->loader->add_action( 'init', new \CraftBlocks\Blocks\BlockRegistrar(), 'register_blocks' );
		$this->loader->add_filter( 'block_categories_all', new \CraftBlocks\Support\Category(), 'register_category' );
	}

	/**
	 * Load the plugin's translation files.
	 *
	 * @return void
	 */
	public function load_textdomain(): void {
		load_plugin_textdomain(
			'craftblocks',
			false,
			dirname( CRAFTBLOCKS_BASENAME ) . '/languages'
		);
	}

	/**
	 * Disable cloning (part of the Singleton pattern).
	 *
	 * @return void
	 */
	private function __clone() {}

	/**
	 * Disable unserializing (part of the Singleton pattern).
	 *
	 * @return void
	 */
	public function __wakeup(): void {
		throw new \Exception( 'Cannot unserialize a singleton.' );
	}
}