/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash, chevronDown, chevronUp } from '@wordpress/icons';

export default function Edit( { attributes, setAttributes } ) {
	const { faqItems } = attributes;

	const [ openIndexes, setOpenIndexes ] = useState( [] );

	const blockProps = useBlockProps();

	/**
	 * Toggle a single FAQ item open/closed in the editor preview.
	 *
	 * @param {number} index Index of the FAQ item to toggle.
	 */
	const toggleOpen = ( index ) => {
		if ( openIndexes.includes( index ) ) {
			setOpenIndexes( openIndexes.filter( ( i ) => i !== index ) );
		} else {
			setOpenIndexes( [ ...openIndexes, index ] );
		}
	};

	/**
	 * Update a single field (question or answer) of a specific FAQ item.
	 *
	 * @param {number} index Index of the FAQ item.
	 * @param {string} field Which field to update: 'question' or 'answer'.
	 * @param {string} value New value for that field.
	 */
	const updateFaqItem = ( index, field, value ) => {
		const updatedItems = [ ...faqItems ];
		updatedItems[ index ] = {
			...updatedItems[ index ],
			[ field ]: value,
		};
		setAttributes( { faqItems: updatedItems } );
	};

	/**
	 * Add a new empty FAQ item to the end of the list.
	 */
	const addFaqItem = () => {
		setAttributes( {
			faqItems: [
				...faqItems,
				{ question: 'New question', answer: 'New answer' },
			],
		} );
	};

	/**
	 * Remove a FAQ item by its index.
	 *
	 * @param {number} index Index of the FAQ item to remove.
	 */
	const removeFaqItem = ( index ) => {
		setAttributes( {
			faqItems: faqItems.filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<div { ...blockProps }>
			{ faqItems.map( ( item, index ) => {
				const isOpen = openIndexes.includes( index );

				return (
					<div key={ index } className="craftblocks-faq-item">
						<div className="craftblocks-faq-question-row">
							<RichText
								tagName="span"
								className="craftblocks-faq-question"
								value={ item.question }
								onChange={ ( value ) => updateFaqItem( index, 'question', value ) }
								placeholder="Question..."
							/>

							<div className="craftblocks-faq-controls">
								<Button
									icon={ isOpen ? chevronUp : chevronDown }
									label={ isOpen ? 'Collapse' : 'Expand' }
									onClick={ () => toggleOpen( index ) }
									isSmall
								/>
								<Button
									icon={ trash }
									label="Remove question"
									onClick={ () => removeFaqItem( index ) }
									isSmall
								/>
							</div>
						</div>

						{ isOpen && (
							<RichText
								tagName="p"
								className="craftblocks-faq-answer"
								value={ item.answer }
								onChange={ ( value ) => updateFaqItem( index, 'answer', value ) }
								placeholder="Answer..."
							/>
						) }
					</div>
				);
			} ) }

			<Button icon={ plus } variant="secondary" onClick={ addFaqItem }>
				Add Question
			</Button>
		</div>
	);
}