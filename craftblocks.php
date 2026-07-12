<?php
/**
 * Plugin Name:       CraftBlocks
 * Plugin URI:        https://github.com/mdaktarujjaman/craftblocks
 * Description:       Modern Gutenberg Blocks Library for WordPress.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      8.1
 * Author:            Md Aktarujjaman
 * Author URI:        https://github.com/mdaktarujjaman
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       craftblocks
 * Domain Path:       /languages
 *
 * @package CraftBlocks
 */

// Direct access theke plugin file ke protect kora.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin er core constants define kora.
define( 'CRAFTBLOCKS_VERSION', '1.0.0' );
define( 'CRAFTBLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'CRAFTBLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'CRAFTBLOCKS_BASENAME', plugin_basename( __FILE__ ) );

// Composer autoloader include kora.
require_once CRAFTBLOCKS_PATH . 'vendor/autoload.php';

// Plugin ke initialize kora.
add_action( 'plugins_loaded', array( '\CraftBlocks\Core\Plugin', 'get_instance' ) );