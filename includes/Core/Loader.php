<?php
/**
 * Hook loader class. Centralizes registration of all actions and filters.
 *
 * @package CraftBlocks\Core
 */

namespace CraftBlocks\Core;

// Prevent direct access to this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Loader
 *
 * Collects actions and filters into arrays, then registers
 * them all with WordPress in a single pass.
 */
final class Loader {

	/**
	 * Registered actions.
	 *
	 * @var array<int, array<string, mixed>>
	 */
	private array $actions = array();

	/**
	 * Registered filters.
	 *
	 * @var array<int, array<string, mixed>>
	 */
	private array $filters = array();

	/**
	 * Add a new action to the collection.
	 *
	 * @param string $hook          WordPress hook name.
	 * @param object $component     Class instance containing the callback.
	 * @param string $callback      Method name to call.
	 * @param int    $priority      Hook priority. Default 10.
	 * @param int    $accepted_args Number of accepted arguments. Default 1.
	 * @return void
	 */
	public function add_action( string $hook, object $component, string $callback, int $priority = 10, int $accepted_args = 1 ): void {
		$this->actions = $this->add( $this->actions, $hook, $component, $callback, $priority, $accepted_args );
	}

	/**
	 * Add a new filter to the collection.
	 *
	 * @param string $hook          WordPress hook name.
	 * @param object $component     Class instance containing the callback.
	 * @param string $callback      Method name to call.
	 * @param int    $priority      Hook priority. Default 10.
	 * @param int    $accepted_args Number of accepted arguments. Default 1.
	 * @return void
	 */
	public function add_filter( string $hook, object $component, string $callback, int $priority = 10, int $accepted_args = 1 ): void {
		$this->filters = $this->add( $this->filters, $hook, $component, $callback, $priority, $accepted_args );
	}

	/**
	 * Shared logic to append a hook entry to the given collection.
	 *
	 * @param array  $hooks         Existing collection (actions or filters).
	 * @param string $hook          WordPress hook name.
	 * @param object $component     Class instance containing the callback.
	 * @param string $callback      Method name to call.
	 * @param int    $priority      Hook priority.
	 * @param int    $accepted_args Number of accepted arguments.
	 * @return array Updated collection.
	 */
	private function add( array $hooks, string $hook, object $component, string $callback, int $priority, int $accepted_args ): array {
		$hooks[] = array(
			'hook'          => $hook,
			'component'     => $component,
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		);

		return $hooks;
	}

	/**
	 * Register all collected actions and filters with WordPress.
	 *
	 * @return void
	 */
	public function run(): void {
		foreach ( $this->actions as $action ) {
			add_action(
				$action['hook'],
				array( $action['component'], $action['callback'] ),
				$action['priority'],
				$action['accepted_args']
			);
		}

		foreach ( $this->filters as $filter ) {
			add_filter(
				$filter['hook'],
				array( $filter['component'], $filter['callback'] ),
				$filter['priority'],
				$filter['accepted_args']
			);
		}
	}
}